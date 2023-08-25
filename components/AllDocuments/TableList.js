import {useState} from "react";
import { useDispatch } from 'react-redux';
import {setNftAttributes} from "@/features/nft/nftSlice";
import Link from "next/link";

const TableList = (props) => {
    const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCollection = props.collection.filter(document =>
        document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.format.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = event => setSearchTerm(event.target.value);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-5">
                {/*<div>*/}
                {/*    <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"*/}
                {/*            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"*/}
                {/*            type="button"*/}
                {/*            onClick={(event) => {*/}
                {/*                event.stopPropagation();*/}
                {/*                setShowDropdown(!showDropdown);*/}
                {/*            }}*/}
                {/*    >*/}
                {/*        /!*<span className="sr-only">Action</span>*!/*/}
                {/*        Action*/}
                {/*        <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"*/}
                {/*             xmlns="http://www.w3.org/2000/svg">*/}
                {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>*/}
                {/*        </svg>*/}
                {/*    </button>*/}
                {/*    <div id="dropdownAction"*/}
                {/*         className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${showDropdown ? '' : 'hidden'}`}>*/}
                {/*        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">*/}
                {/*            <li>*/}
                {/*                <a href="@/components/AllDocuments/TableList#"*/}
                {/*                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                   onClick={(e) => {e.stopPropagation()}}*/}
                {/*                >*/}
                {/*                    Reward*/}
                {/*                </a>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <a href="@/components/AllDocuments/TableList#"*/}
                {/*                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                   onClick={(e) => {e.stopPropagation()}}*/}
                {/*                >*/}
                {/*                    Promote*/}
                {/*                </a>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <a href="@/components/AllDocuments/TableList#"*/}
                {/*                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                   onClick={(e) => {e.stopPropagation()}}*/}
                {/*                >*/}
                {/*                    Activate account*/}
                {/*                </a>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*        <div className="py-1">*/}
                {/*            <a href="@/components/AllDocuments/TableList#"*/}
                {/*               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete*/}
                {/*                User</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users"
                           className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search for documents"
                           value={searchTerm}
                           onChange={handleSearchChange} />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-3">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Format
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredCollection.map((document) => (
                    <tr key={document.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-24 h-20 rounded-lg" src={document.image}
                                 width="100%"
                                 alt="" />
                            <div className="pl-3">
                                <Link
                                    href={`/nft`} // Specify the URL you want to redirect to
                                    onClick={() =>
                                        dispatch(
                                            setNftAttributes({
                                                name: document.name,
                                                format: document.format,
                                                image: document.image,
                                                status: document.status,
                                                category: document.category,
                                            })
                                        )
                                    }
                                >
                                    <div className="text-base font-semibold hover:underline">{document.name}</div>
                                </Link>
                                {/*<div className="font-normal text-gray-500">{document.format}</div>*/}
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            {document.category}
                        </td>
                        <td className="px-6 py-4">
                            {document.format}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${document.status === "minted" ? "bg-blue-700" : document.status === "verified" ? "bg-green-500" : "bg-yellow-300"} mr-2`}></div>

                                {document.status !== "" ? document.status.charAt(0).toUpperCase() + document.status.slice(1) : ""}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <a href="@/components/AllDocuments/TableList#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Share</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableList;
