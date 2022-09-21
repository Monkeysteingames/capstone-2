import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'reactstrap';
import MovieRow from './MovieRow';
import "../movie/Movies.css";

function MoviesPaginator({ movies }) {
    const [groupedMovies, setGroupedMovies] = useState([]);
    const [index, setIndex] = useState(0);
    const circleButtonStyle = {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius:50,
    };

    useEffect(function groupMoviesWhenMounted() {
        async function groupMovies(movies) {
            let iterator = 1;
            let groupArr = [];
            let tempGroupArr = [];
        
            for (let i = 0; i <= movies.length; i++) {    
                if (iterator === 5) {
                    iterator = 1;
                    //add 5th movie to sub group
                    tempGroupArr.push(movies[i]);
                    //add subgroup to top array
                    groupArr.push(tempGroupArr);
                    //clear subgroup array
                    tempGroupArr = [];
                } else {
                    iterator++;
                    tempGroupArr.push(movies[i]);
                }
            };
            setGroupedMovies(groupArr);
        };
        groupMovies(movies);
    }, [movies]);

    function changePage(index) {
        if (index > 3) {
            setIndex(3);
        } else if (index < 0) {
            setIndex(0);
        } else {
            setIndex(index);
        }
    };

    return (
        <div>
            {!groupedMovies ? 
            <Spinner
            color="dark"
            >
            </Spinner> 
            :
            <>
            <div className='center'>
            <MovieRow movies={groupedMovies[index]}/>
            </div>
            <div className='center'>
            <Button style={circleButtonStyle} onClick={() => changePage(0)}>
                first
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(index - 1)}>
                prev
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(0)}>
                1
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(1)}>
                2
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(2)}>
                3
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(3)}>
                4
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(index + 1)}>
                next
            </Button>
            <Button style={circleButtonStyle} onClick={() => changePage(3)}>
                last
            </Button>
            </div>
            </>
        }
    </div>
    );
};

export default MoviesPaginator;

   