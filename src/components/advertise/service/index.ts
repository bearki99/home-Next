import myRequest from "@/service/index";
export const getAdvertiseData = () => {
  return myRequest.get("/api/advertisements");
};
