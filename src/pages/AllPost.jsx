import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import  Container from '../components/container/Container'
import PostCard from '../components/PostCard'


function AllPost() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.getPost().then((posts)=>{
            if(posts?.documents?.length > 0){
                setPosts(posts.documents)
            }
        })
    },[])
   
    // useEffect(() => {
    //     const getPosts = async () => {
    //         try {
    //             const response = await appwriteService.getAllPost();
    //             setPosts(response.documents);
    //         } catch (error) {
    //             console.log("Error fetching posts:", error);
    //         }
    //     };

    //     getPosts(); // 👈 You forgot to call this inside useEffect
    // }, []);  
  return (
    <div className='py-8 w-full '>
        <Container>
            <div className='flex flex-wrap'>
            {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className='w-full text-center py-4'>
                            <h2 className='text-lg text-gray-700'>No posts available.</h2>
                        </div>
                    )}
            </div>
            
        </Container>
    </div>
  )
}

export default AllPost