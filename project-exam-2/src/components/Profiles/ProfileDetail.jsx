import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToken } from "../../states/userStore";
import { API_KEY, PROFILE_URL } from "../../constants/api";

async function getProfile(token, name) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(`${PROFILE_URL}/${name}`, options);

  if (!response.ok) {
    throw new Error("There was an error fetching the profile");
  }

  const responseData = await response.json();
  console.log(responseData);

  return responseData.data;
}

function ProfileDetail() {
  const token = useToken();
  const { name } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", name],
    queryFn: () => getProfile(token, name),
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data && (
        <div>
          <img src={data.banner.url}></img>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
          <img src={data.avatar.url}></img>
        </div>
      )}
    </>
  );
}

export default ProfileDetail;
