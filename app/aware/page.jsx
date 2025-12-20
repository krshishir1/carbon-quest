"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TreePine, MessageCircle, Heart, Share2, PlusCircle, Video, Image as ImageIcon, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const IMPACT_TAGS = ["Air", "Water", "Plastic", "Climate"];

const Comment = ({ comment, allComments, onReply, user }) => {
    const replies = allComments.filter(c => c.parentPost === comment._id);

    return (
        <div className="mt-4 first:mt-0">
            <div className="flex gap-3 group">
                <Avatar className="w-8 h-8 border shadow-sm flex-shrink-0">
                    <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-[10px]">{comment.author.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-neutral-50 rounded-2xl rounded-tl-none p-3 transition-colors hover:bg-neutral-100">
                    <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-neutral-900 text-xs">{comment.author.name}</span>
                        <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-neutral-700 text-sm font-medium leading-snug">{comment.content}</p>
                    {user && (
                        <button
                            onClick={() => onReply(comment)}
                            className="text-[10px] font-bold text-neutral-400 hover:text-green-600 mt-1 uppercase tracking-wider"
                        >
                            Reply
                        </button>
                    )}
                </div>
            </div>
            {replies.length > 0 && (
                <div className="ml-6 border-l-2 border-neutral-100 pl-4 mt-2">
                    {replies.map(reply => (
                        <Comment
                            key={reply._id}
                            comment={reply}
                            allComments={allComments}
                            onReply={onReply}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function AwarenessPage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [causes, setCauses] = useState([]);
    const [allComments, setAllComments] = useState({}); // { postId: [comments] }
    const [newComments, setNewComments] = useState({}); // { postId: content }
    const [replyingTo, setReplyingTo] = useState(null);
    const [donationAmount, setDonationAmount] = useState(10);
    const [selectedCause, setSelectedCause] = useState(null);
    const [newPost, setNewPost] = useState({ content: "", impactTag: "Climate", media: null });
    const [mediaPreview, setMediaPreview] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchData();
        fetchCauses();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceWithoutToken.get("/community/posts");
            setPosts(data.posts);
            // Fetch comments for all posts
            data.posts.forEach(post => {
                fetchComments(post._id);
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCauses = async () => {
        try {
            const { data } = await axiosInstanceWithoutToken.get("/community/causes");
            setCauses(data.causes);
            if (data.causes.length > 0) setSelectedCause(data.causes[0]._id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const { data } = await axiosInstanceWithoutToken.get(`/community/comments/${postId}`);
            setAllComments(prev => ({ ...prev, [postId]: data.comments }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPost({ ...newPost, media: file });
            setMediaPreview(URL.createObjectURL(file));
        }
    };

    const checkAuth = (action) => {
        if (!user) {
            alert(`Please login to ${action}`);
            router.push("/login");
            return false;
        }
        return true;
    };

    const handleCreatePost = async () => {
        if (!checkAuth("post awareness")) return;
        if (!newPost.content || !newPost.impactTag) return;

        const formData = new FormData();
        formData.append("content", newPost.content);
        formData.append("impactTag", newPost.impactTag);
        formData.append("author", JSON.stringify({
            name: user.name,
            username: user.username,
            avatarUrl: ""
        }));
        if (newPost.media) {
            formData.append("media", newPost.media);
        }

        try {
            await axiosInstanceWithoutToken.post("/community/posts", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            setIsCreateModalOpen(false);
            setNewPost({ content: "", impactTag: "Climate", media: null });
            setMediaPreview(null);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePlantTree = async (postId) => {
        if (!checkAuth("plant a tree")) return;
        try {
            await axiosInstanceWithoutToken.post("/community/plant-tree", {
                postId,
                userId: user._id
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Error planting tree");
        }
    };

    const handleAddComment = async (postId, parentComment = null) => {
        if (!checkAuth("add a comment")) return;
        const content = newComments[postId];
        if (!content) return;

        try {
            await axiosInstanceWithoutToken.post("/community/comments", {
                content,
                rootPost: postId,
                parentPost: parentComment?._id,
                author: {
                    name: user.name,
                    username: user.username,
                    avatarUrl: ""
                },
                orderId: 0
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            });
            setNewComments(prev => ({ ...prev, [postId]: "" }));
            setReplyingTo(null);
            fetchComments(postId);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDonate = async () => {
        if (!checkAuth("donate")) return;
        try {
            await axiosInstanceWithoutToken.post("/community/donate", {
                userId: user._id,
                causeId: selectedCause,
                postId: activePost?._id,
                amount: donationAmount
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            });
            setIsDonationModalOpen(false);
            alert("Donation successful! 💚");
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading Awareness...</div>;

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            <Header />
            <main className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-neutral-900 tracking-tight">Awareness Feed</h1>
                        <p className="text-neutral-500 font-medium tracking-tight">Stay informed. Stay impactful.</p>
                    </div>
                    {user && (
                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-green-600 hover:bg-green-700 text-white flex gap-2 rounded-full px-6 font-bold shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95">
                                    <PlusCircle className="w-5 h-5" />
                                    Share Impact
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px] rounded-[2rem] border-none shadow-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black text-neutral-900">Create Awareness Post</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    <textarea
                                        className="w-full h-40 p-5 rounded-2xl border-none bg-neutral-100 focus:ring-2 focus:ring-green-500 outline-none resize-none font-medium text-neutral-800"
                                        placeholder="What environmental awareness are you bringing today?"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    />
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-neutral-500 uppercase tracking-wider px-1">Impact Category</label>
                                        <div className="flex gap-2 items-center overflow-x-auto pb-2 -mx-1 px-1">
                                            {IMPACT_TAGS.map(tag => (
                                                <Badge
                                                    key={tag}
                                                    variant={newPost.impactTag === tag ? "default" : "outline"}
                                                    className={`cursor-pointer px-6 py-2 rounded-xl transition-all border-2 ${newPost.impactTag === tag ? "bg-green-600 border-green-600 text-white" : "hover:border-green-500 border-neutral-200 text-neutral-500"}`}
                                                    onClick={() => setNewPost({ ...newPost, impactTag: tag })}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 transition-colors flex-1 justify-center border-2 border-dashed border-neutral-300">
                                            <ImageIcon className="text-green-600 w-5 h-5" />
                                            <span className="text-sm font-bold text-neutral-700">Add Media</span>
                                            <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    {mediaPreview && (
                                        <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-lg group">
                                            {newPost.media?.type.startsWith('video') ? (
                                                <video src={mediaPreview} className="w-full max-h-56 object-cover" />
                                            ) : (
                                                <img src={mediaPreview} className="w-full max-h-56 object-cover" />
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-3 right-3 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => { setNewPost({ ...newPost, media: null }); setMediaPreview(null) }}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    )}
                                    <Button onClick={handleCreatePost} className="w-full bg-neutral-900 hover:bg-black text-white rounded-2xl py-7 text-lg font-black transition-all shadow-xl active:scale-[0.98]">
                                        Publish Movement
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="grid gap-10">
                    {posts.map((post) => (
                        <Card key={post._id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white group">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-8">
                                <div
                                    className="flex items-center gap-4 cursor-pointer"
                                    onClick={() => {
                                        router.push(`/aware/profile?id=${post.author.userId || post.author._id}`);
                                    }}
                                >
                                    <Avatar className="w-14 h-14 border-4 border-neutral-50 shadow-sm transition-transform group-hover:scale-105">
                                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                                        <AvatarFallback className="bg-green-100 text-green-700 font-bold">{post.author.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-black text-neutral-900 text-lg leading-tight">{post.author.name}</span>
                                        <span className="text-sm text-neutral-400 font-bold">@{post.author.username}</span>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <Badge className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-none px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest">
                                        {post.impactTag}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="px-8 pb-6">
                                    <p className="text-neutral-700 text-xl font-medium leading-relaxed">{post.content}</p>
                                </div>
                                {(post.imageUrl || post.videoUrl) && (
                                    <div className="px-4 pb-4">
                                        <div className="w-full bg-neutral-50 rounded-[2rem] overflow-hidden border border-neutral-100">
                                            {post.imageUrl && (
                                                <img src={post.imageUrl} className="w-full object-cover max-h-[600px]" alt="Awareness" />
                                            )}
                                            {post.videoUrl && (
                                                <video src={post.videoUrl} controls className="w-full max-h-[600px]" />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Donation Summary UI */}
                                <div className="px-8 py-4 bg-neutral-50/50 flex flex-wrap gap-4 border-y border-neutral-100">
                                    <div className="flex items-center gap-2">
                                        <Heart className={`w-4 h-4 text-green-500 fill-green-500`} />
                                        <span className="text-sm font-black text-neutral-900">${post.donations || 0}</span>
                                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Raised for causes</span>
                                    </div>
                                    <div className="flex gap-1 ml-auto">
                                        {causes.slice(0, 3).map(c => (
                                            <Badge key={c._id} variant="outline" className="text-[9px] border-neutral-200 text-neutral-400 capitalize whitespace-nowrap">
                                                {c.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 flex items-center justify-between border-b border-neutral-50">
                                    <div className="flex gap-4">
                                        <Button
                                            variant="ghost"
                                            className={`flex gap-3 items-center px-6 py-6 rounded-2xl transition-all duration-300 ${post.trees?.includes(user?._id) ? 'bg-green-50 text-green-600 scale-105 shadow-sm shadow-green-100' : 'text-neutral-500 hover:bg-neutral-50'}`}
                                            onClick={() => handlePlantTree(post._id)}
                                        >
                                            <TreePine className={`w-7 h-7 ${post.trees?.includes(user?._id) ? 'fill-current' : ''}`} />
                                            <span className="text-lg font-black">{post.trees?.length || 0}</span>
                                        </Button>
                                    </div>
                                    <Button
                                        className="bg-neutral-900 text-white hover:bg-black rounded-2xl py-6 px-8 flex gap-3 font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
                                        onClick={() => {
                                            setActivePost(post);
                                            setIsDonationModalOpen(true);
                                        }}
                                    >
                                        <Heart className={`w-5 h-5 ${post.donations > 0 ? 'fill-green-400 text-green-400' : 'text-neutral-400'}`} />
                                        Support Cause
                                    </Button>
                                </div>

                                {/* Inline Nested Comments */}
                                <div className="p-8 bg-neutral-50/30">
                                    <div className="flex items-center gap-2 mb-6">
                                        <MessageCircle className="w-5 h-5 text-neutral-400" />
                                        <h4 className="font-black text-neutral-900 uppercase tracking-widest text-xs">Community Discussion</h4>
                                    </div>
                                    <div className="space-y-4">
                                        {(allComments[post._id] || [])
                                            .filter(c => !c.parentPost)
                                            .map(comment => (
                                                <Comment
                                                    key={comment._id}
                                                    comment={comment}
                                                    allComments={allComments[post._id] || []}
                                                    onReply={(c) => {
                                                        setReplyingTo(c);
                                                        setNewComments(prev => ({ ...prev, [post._id]: `@${c.author.username} ` }));
                                                    }}
                                                    user={user}
                                                />
                                            ))}
                                        {(!allComments[post._id] || allComments[post._id].length === 0) && (
                                            <p className="text-neutral-400 text-sm italic py-4">No contributions yet. Be the first!</p>
                                        )}
                                    </div>

                                    {user && (
                                        <div className="mt-8">
                                            {replyingTo && (
                                                <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-t-xl border-x border-t border-green-100">
                                                    <span className="text-xs font-bold text-green-700">Replying to @{replyingTo.author.username}</span>
                                                    <button onClick={() => setReplyingTo(null)} className="text-green-700 font-bold text-xs">×</button>
                                                </div>
                                            )}
                                            <div className={`flex gap-3 items-center bg-white border border-neutral-100 p-2 ${replyingTo ? 'rounded-b-2xl' : 'rounded-2xl'} shadow-sm focus-within:ring-2 focus-within:ring-green-500 transition-all`}>
                                                <input
                                                    className="flex-1 bg-transparent border-none outline-none p-3 font-bold text-neutral-800 placeholder:text-neutral-400 text-sm"
                                                    placeholder={replyingTo ? "Write a reply..." : "Add to the awareness..."}
                                                    value={newComments[post._id] || ""}
                                                    onChange={(e) => setNewComments(prev => ({ ...prev, [post._id]: e.target.value }))}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post._id, replyingTo)}
                                                />
                                                <Button size="icon" className="rounded-xl bg-neutral-900 hover:bg-black text-white w-10 h-10 shadow-lg" onClick={() => handleAddComment(post._id, replyingTo)}>
                                                    <Send className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Support Cause Modal */}
                <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
                    <DialogContent className="sm:max-w-[500px] rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-10 text-white">
                            <Heart className="w-12 h-12 mb-6 fill-white opacity-90" />
                            <h2 className="text-3xl font-black leading-tight tracking-tight">Fuel a Better Future</h2>
                            <p className="text-green-50 mt-2 font-bold opacity-80">100% of your gift goes directly to the project.</p>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Select Your Cause</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {causes.map((cause) => (
                                        <div
                                            key={cause._id}
                                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${selectedCause === cause._id ? 'border-green-600 bg-green-50' : 'border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50'}`}
                                            onClick={() => setSelectedCause(cause._id)}
                                        >
                                            <div className="flex flex-col flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`font-black text-lg ${selectedCause === cause._id ? 'text-green-700' : 'text-neutral-900'}`}>{cause.name}</span>
                                                    <span className="text-xs font-bold text-neutral-400">${cause.totalRaised} / ${cause.goal}</span>
                                                </div>
                                                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500 transition-all duration-1000"
                                                        style={{ width: `${Math.min(100, (cause.totalRaised / cause.goal) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedCause === cause._id ? 'border-green-600 bg-green-600 text-white' : 'border-neutral-300'}`}>
                                                {selectedCause === cause._id && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Donation Amount ($USD)</label>
                                <div className="flex gap-4">
                                    {[10, 25, 50, 100].map((amt) => (
                                        <Button
                                            key={amt}
                                            variant={donationAmount === amt ? "default" : "outline"}
                                            className={`flex-1 rounded-2xl py-6 font-black text-lg transition-all border-2 ${donationAmount === amt ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-100 hover:border-neutral-300 text-neutral-500'}`}
                                            onClick={() => setDonationAmount(amt)}
                                        >
                                            ${amt}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={handleDonate} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[2rem] py-8 text-xl font-black transition-all shadow-[0_20px_40px_rgba(22,163,74,0.2)] hover:shadow-[0_25px_50px_rgba(22,163,74,0.3)] active:scale-[0.98]">
                                Confirm Impact
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
}
