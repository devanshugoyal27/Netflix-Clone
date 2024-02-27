import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movies',
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        popularMovies:null,
        upcomingMovies:null,
        tvSeries:null,
        allTrailer:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
                state.nowPlayingMovies =  action.payload;
        },
        addTrailerVideo:(state,action)=>{
                state.trailerVideo =  action.payload;
        },
        addPopularMovies:(state,action)=>{
                state.popularMovies =  action.payload;
        },
        addUpcomingMovies:(state,action)=>{
                state.upcomingMovies =  action.payload;
        },
        addTvSeries:(state,action)=>{
                state.tvSeries =  action.payload;
        },
        addAllTrailer:(state,action)=>{
                state.allTrailer =  action.payload;
        }
        
    }

})
export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addUpcomingMovies,addTvSeries,addAllTrailer} = movieSlice.actions;

export default movieSlice.reducer;