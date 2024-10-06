import { create } from "zustand";

import { format } from "date-fns"

const default_trackOptions = ["Transportation", "Energy Consumption", "Diet", "Waste Management"]

import axios from "axios"

const trackStore = create((set) => ({
    trackOptions: default_trackOptions,
    currentOption: default_trackOptions[0],
    changeCurrentOption: (option) => set({ currentOption: option }),
    currentDate: new Date(),
    changeCurrentDate: (date) => set({currentDate: date}),
    answers: [],
    totalEmmissions: 0,
    addAnswer: async (answer, trackOptType) => {
        set((state) => {
            return {
                answers: [...state.answers, {...answer, trackOptType}],
                totalEmmissions: state.totalEmmissions + answer.emissions
            }
        })

        try {

            const answers = trackStore.getState().answers
            const dateCreated = trackStore.getState().currentDate
            let user = localStorage.getItem("user")
            user = JSON.parse(user) 

            console.log(dateCreated, answers, user)

            const request = {
                method: "POST",
                url: "http://localhost:3000/tracks/create",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    userId: user._id,
                    dateCreated: format(dateCreated, "d MMMM yyyy"),
                    answers
                }
            }

            await axios(request)

        } catch(err) {
            console.log(err.data)
        }
    }
}))

export default trackStore;