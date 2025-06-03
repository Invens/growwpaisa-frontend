import React, { useState } from 'react';
import PostItem from './PostItem';
import { DUMMY_POSTS } from '../data';

const Posts = () => {
    const [posts] = useState(DUMMY_POSTS); // Removed setPosts

    return (
        <section className="posts">
            <div className="container posts__container">
                {posts.map(({ id, thumbnail, title, desc }) => (
                    <PostItem
                        key={id}
                        postID={id}
                        thumbnail={thumbnail}
                        title={title}
                        description={desc}
                    />
                ))}
            </div>
        </section>
    );
}

export default Posts;