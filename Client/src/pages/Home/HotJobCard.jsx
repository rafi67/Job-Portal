import React from "react";
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;
  return (
    <div className="card card-compact bg-base-100 shadow-xl shadow-gray-700 p-4">
            <div className='flex gap-2 m-2'>
                {/* <figure>
                    <img
                        className='w-16'
                        src={company_logo}
                        alt="Shoes" />
                </figure> */}
                <div>
                    <h4 className="text-2xl font-medium">{company}</h4>
                    <p className='flex gap-1 items-center'> <FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <div className='flex gap-2 flex-wrap'>
                    {
                        requirements.map((skill, index) => <p
                            key={index}
                            className='border rounded-md text-center px-2 hover:text-purple-600 hover:bg-gray-400'
                        >{skill}</p>)
                    }
                </div>
                <div className="card-actions justify-end items-center mt-4">

                    <p className='flex items-center text-lg font-medium mb-4'>Salary: <FaDollarSign></FaDollarSign> {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                    
                    <Link to={`/jobs/${_id}`} className="w-full btn btn-primary">
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
  );
};

export default HotJobCard;
