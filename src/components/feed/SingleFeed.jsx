import { createMirror } from "@/lens/mirror.js";
import { hasMirrored } from "@/lens/check-mirror.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostStatus from "../post/PostStatus";

const SingleFeed = ({ data }) => {
  const stats = data.postStats;
  const userProPic = data.profile.picture;
  const userProName = data.profile.name;
  const userProDesc = data.profile.description;
  const pubContent = data.postContent;
  const pubTime = data.postTimeStamp;
  const pubImge = data.postMedia;
  const postId = data.postId;
  const profileId = window.localStorage.getItem("profileId");
  const [mirrored, setMirrored] = useState("");
  const [loading, setLoading] = useState(false);

  const mirrorFunc = async (_postId) => {
    setLoading(true);
    await createMirror(profileId, _postId);
    setLoading(false);
  };

  const checkMirror = async (_profileId, _postId) => {
    const res = await hasMirrored(_profileId, [_postId]);
    setMirrored(res);
  };

  useEffect(() => {
    if (profileId) {
      checkMirror(profileId, postId); // only checks after a user logged in
    }
  }, [loading]);

  return (
    <>
      {/* <div className="bg-gray-700 flex justify-center flex-col items-center text-white border border-rose-300 ">
        <div className="flex border border-yellow-500">
          <img
            src={userProPic}
            alt="profile picture"
            className="w-20 m-3 rounded-full inline"
          />
          <div className="m-4">
            <div className="text-3xl">{userProName}</div>
            <div className="text-gray-300"> {userProDesc} </div>
          </div>
        </div>
        <div className="post"> {pubContent} </div>
        <div className="pics">pic</div>
      </div> */}

      <div className="flex w-full justify-center">
        <div className="p-4 my-1 border rounded border-slate-300 max-w-3xl w-full ">
          <Link to={`/post/${postId}`}>
            <div className="flex space-x-3 py-10 pt-2">
              <img
                className="h-9 w-9 rounded-full"
                src={userProPic}
                alt="profile picture"
              />
              <div className="flex-1 space-y-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="">
                    <h3 className="text-sm font-medium">{userProName}</h3>
                    <p className="text-gray-500 text-sm">{userProDesc}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {pubTime.slice(5, 10) + " " + pubTime.slice(12, 16)}
                  </p>
                </div>
                <p className="text-base text-gray-800">
                  {pubContent?.replace(/(<([^>]+)>)/gi, "")}
                  {/* {pubContent} */}
                </p>
                <img
                  src={pubImge?.length ? pubImge : ""}
                  alt={pubImge?.length ? "publication image" : ""}
                  className="rounded w-96 pr-2 self-center"
                />
              </div>
            </div>
          </Link>
          {/* <div className="flex justify-end">
            {mirrored ? (
              <div className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Mirrored
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => mirrorFunc(postId)}
              >
                Mirror
              </button>
            )}
          </div> */}
          <PostStatus postData={stats} fnc={{ mirrored, mirrorFunc }} />
        </div>
      </div>
    </>
  );
};

export default SingleFeed;
