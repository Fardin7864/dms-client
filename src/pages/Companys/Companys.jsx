import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPrivet from "../../hooks/useAxiosPrivet/useAxiosPrivet";
import { useState } from "react";

const Companys = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivet = useAxiosPrivet();
  const [isShow, setIshshow] = useState(false);

  const { isPending, error, data, isFetching, refetch  } = useQuery({
    queryKey: ["companys"],
    queryFn: () => axiosPublic.get("company").then((res) => res.data.data),
  });

  const queryClient = useQueryClient();

// Assuming you have a queryKey to identify your query
const queryKey = 'companys';



//   console.log(data);

const hadndleDelete = (id) => { 
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
           const deleteResult = axiosPrivet.delete(`company/delete-company/${id}`).then(res=> console.log(res.data))
           // Refetch the query
            queryClient.invalidateQueries(queryKey);
        //    console.log(deleteResult)
                 refetch()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
 }

  return (
    <>
    {
      !isShow ? (<div className=" px-5 my-5">
      <button onClick={() => setIshshow(true)} className=" btn btn-md btn-primary">Add Company</button>
    </div>) : ""
    }

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((company, index) => (
              <tr key={company?._id}>
                <th>{index + 1}</th>
                <td>{company?.companyName?.toUpperCase()}</td>
                <td>{company?.groupe?.toUpperCase()}</td>
                <td>
                  <button className="btn btn-sm text-black btn-accent">
                    <AiFillEdit className=" text-white text-base md:text-xl" />
                  </button>{" "}
                  <button className="btn btn-sm btn-warning">
                    <AiFillDelete onClick={()=> hadndleDelete(company._id)} className=" text-purple-900 text-base md:text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Companys;
