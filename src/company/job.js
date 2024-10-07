import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const JobList = () =>{
   let[alljob, updateJob]= useState([]);
   const getjob =()=>{
     fetch("https://easytohire.in/testapi/myapi/alljob")
     .then(response=>response.json())
     .then(jobArray=>{
        updateJob(jobArray);
     })
   }

   useEffect(()=>{
    getjob();
   }, []);


   let[keyword, pickKeyword]= useState("");
   const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(alljob.length / PER_PAGE);

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8 text-center">
                    <h3 className="text-success"><i className="fa fa-suitcase"></i> Manage Jobs :{alljob.length} </h3>
                </div>
                <div className="col-lg-4">
                    <input type="text" className="form-control" onChange={obj=>pickKeyword(obj.target.value)} placeholder="search"/>
                </div>
            </div>

                {
                alljob.slice(offset, offset+ PER_PAGE).map((job, index)=>{
                    if(job.jobtitle.toLowerCase().match(keyword.toLowerCase()))
                    return(
                        <div className="row mb-4 shadow p-3" key={index}> 
                            <div className="col-lg-3">
                                <h5 className="text-primary">{job.jobtitle}</h5>
                                <p>Salary: {job.minsal} to {job.maxsal}</p>
                                <p>Experience: {job.minexp} to {job.maxexp} Yrs</p>
                                <p>Location: {job.location}</p>
                            </div>

                            <div className="col-lg-3">
                                <p>Job Role: {job.role}</p>
                                <p>Applied: {job.totalprofile}</p>
                                <p>Shortlisted: {job.sortlisted}</p>
                                <p>Job open: {job.active}</p>
                            </div>

                            <div className="col-lg-6">
                                <b>Job Details</b>
                                <p>{job.jd}</p>
                            </div>
                        </div>

                        
                    )
                })
               }

    <div className="mb-4 mt-4">
	  <ReactPaginate
		previousLabel={"Previous"}
		nextLabel={"Next"}
		breakLabel={"..."}
		pageCount={pageCount}
		marginPagesDisplayed={2}
		pageRangeDisplayed={3}
		onPageChange={handlePageClick}
		containerClassName={"pagination  justify-content-center"}
		pageClassName={"page-item "}
		pageLinkClassName={"page-link"}
		previousClassName={"page-item"}
		previousLinkClassName={"page-link"}
		nextClassName={"page-item"}
		nextLinkClassName={"page-link"}
		breakClassName={"page-item"}
		breakLinkClassName={"page-link"}
		activeClassName={"active primary"}
	  />
    </div>
        </div>
    )

}

export default JobList;