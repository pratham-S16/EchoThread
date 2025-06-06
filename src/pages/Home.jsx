import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import LogoutBtn from "../components/Header/LogoutBtn";
import { login, logout } from "../store/authSlice";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [message,setMessage]=useState('')
  const authStatus = useSelector((state) => state.auth.status);

   useEffect(() => {
    if (authStatus) {
      const timer = setTimeout(() => {
        setMessage('No posts yet. Create a post!');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [authStatus]);

  useEffect(() => {
    if (!authStatus) {
      setPosts([]);
    } else {
      appwriteService.getAllPost().then((posts) => {
        if (posts?.documents.length > 0) {
          setPosts(posts.documents);
        }
      });
    }
  }, [authStatus]);

  const democards = [
    {
      img: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
      title: "Food",
    },
    {
      img: "https://media.istockphoto.com/id/1164736873/photo/silhouette-action-sport-outdoors-of-a-group-of-kids-having-fun-playing-soccer-football-for.jpg?s=612x612&w=0&k=20&c=nTeHF_1btt_PCZ6M5EvcD0vb_thUF6AaMDqNleWo-e4=",
      title: "Sports",
    },
    {
      img: "https://thumbs.dreamstime.com/b/good-health-good-life-female-hand-chalk-writing-text-blue-background-97044786.jpg",
      title: "Health",
    },
    {
      img: "https://st2.depositphotos.com/3725083/5485/i/450/depositphotos_54856269-Travel-the-world-monument-concept.jpg",
      title: "World",
    },
  ];

  if (posts.length === 0) {
    return (
      <div className="w-full  py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex ">
              {!authStatus
                ? democards.map((item) => (
                    <div className="w-full bg-gray-100 hover:scale-105 hover:ease-in hover:duration-175 rounded-xl p-4 m-2 ">
                      <div className="w-full justify-center ">
                        <img
                          src={item.img}
                          alt={item.title}
                          className='className="w-full h-48 object-cover rounded-xl '
                        />
                      </div>
                      <h2 className=" mt-1 font-bold">{item.title}</h2>
                    </div>
                  ))
                : null}
            </div>

            <div className="p-2 w-full mt-2">
              <h1 className="text-2xl font-bold  hover:text-gray-700">
                {authStatus
                  ? message
                  : <Link to='/login'>Login to read posts </Link>}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

// checked
