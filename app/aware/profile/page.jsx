"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TreePine, Heart, Award, Star, MessageSquare, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ImpactProfile() {
    const [user, setUser] = useState(null);
    const [impactData, setImpactData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/login");
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const userId = params.get("id") || JSON.parse(storedUser)._id;

        setUser(JSON.parse(storedUser));
        fetchImpactData(userId);
    }, []);

    const fetchImpactData = async (userId) => {
        try {
            const { data } = await axiosInstanceWithoutToken.get(`/community/profile/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
            });
            setImpactData(data.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black text-neutral-400 uppercase tracking-widest text-xs">Loading Impact...</p>
        </div>
    </div>;
    if (!impactData) return <div className="flex justify-center items-center h-screen">Profile not found</div>;

    const stats = [
        { label: "Trees Planted", value: impactData.treesPlanted || 0, icon: TreePine, color: "text-green-600", bg: "bg-green-100" },
        { label: "Impact Score", value: impactData.impactScore || 0, icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
        { label: "Total Donated", value: `$${impactData.totalDonated || 0}`, icon: Heart, color: "text-red-600", bg: "bg-red-100" },
        { label: "Helpful Contributions", value: impactData.helpfulComments || 0, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100" },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            <Header />
            <main className="container mx-auto py-12 px-4 max-w-5xl">
                <button
                    onClick={() => router.push("/aware")}
                    className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 font-black uppercase tracking-widest text-xs mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Feed
                </button>

                <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem] bg-white mb-12">
                    <div className="h-64 bg-gradient-to-br from-green-400 via-green-500 to-green-700 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    </div>
                    <CardContent className="relative pt-0 px-12 pb-12">
                        <div className="flex flex-col md:flex-row items-end gap-8 -mt-20 mb-10">
                            <Avatar className="w-48 h-48 border-[12px] border-white shadow-2xl transition-transform hover:scale-105">
                                <AvatarImage src={impactData.avatarUrl} />
                                <AvatarFallback className="text-5xl bg-neutral-100 font-black text-neutral-300">{impactData.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 pb-4">
                                <div className="flex items-center gap-4 mb-1">
                                    <h1 className="text-5xl font-black text-neutral-900 tracking-tighter">{impactData.name}</h1>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                                        Impact Guardian
                                    </Badge>
                                </div>
                                <p className="text-xl text-neutral-400 font-bold">@{impactData.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1">
                                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-4xl font-black text-neutral-900 mb-1 tracking-tighter">{stat.value}</span>
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-2 border-none shadow-xl rounded-[2.5rem] bg-white p-10">
                        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-neutral-900 tracking-tight">
                            <Award className="text-yellow-500 w-8 h-8" />
                            Contribution Journey
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-6 p-6 rounded-[2rem] bg-neutral-50 border-2 border-dashed border-neutral-200 transition-colors hover:bg-neutral-100">
                                <div className="w-16 h-16 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center shadow-md text-3xl">
                                    🌳
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-black text-lg text-neutral-900">First Tree Planted</h4>
                                    <p className="text-sm text-neutral-500 font-medium italic">You started your impact journey on {new Date(impactData.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-[2rem] bg-neutral-50 border-2 border-dashed border-neutral-100 opacity-40 grayscale">
                                <div className="w-16 h-16 bg-white rounded-2xl border border-neutral-100 flex items-center justify-center shadow-md text-3xl">
                                    🌊
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-black text-lg text-neutral-900">Ocean Guardian</h4>
                                    <p className="text-sm text-neutral-500 font-medium uppercase tracking-widest">Locked · Reach 100 Impact Score</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-neutral-900 text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h2 className="text-2xl font-black mb-8 tracking-tight relative z-10">Impact Badge</h2>
                        <div className="relative z-10 mb-8">
                            <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)] animate-pulse border-[10px] border-green-400">
                                <TreePine className="w-20 h-20 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black mb-2 tracking-tight relative z-10">Seedling Voyager</h3>
                        <p className="text-neutral-400 text-sm font-bold uppercase tracking-widest relative z-10 px-4">
                            Plant {5 - (impactData.treesPlanted % 5)} more trees to reach Level {Math.floor(impactData.treesPlanted / 5) + 2}
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
}
