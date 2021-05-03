import React from 'react';

const AddFavorites = (props) => {

    const {isFavorite} = props;
    return (
        <>
            <span className="mr-2">Add to Favorites</span>
            {isFavorite}
        </>
    )
}

export default AddFavorites;