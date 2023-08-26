import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setNftAttributes } from '@/features/nft/nftSlice';
import Link from 'next/link';

const TableGrid = (props) => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCollection, setFilteredCollection] = useState(props.collection);
    const [isAnyCardFlipped, setIsAnyCardFlipped] = useState(false);

    useEffect(() => {
        setFilteredCollection(props.collection.filter(document =>
            document.category && document.category.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, props.collection]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(isAnyCardFlipped) {
                const resetCollection = filteredCollection.map(document => ({
                    ...document,
                    isFlipped: false,
                }));
                setFilteredCollection(resetCollection);
                setIsAnyCardFlipped(false);
            }
        }

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [filteredCollection, isAnyCardFlipped]);

    const categories = [
        "Certificates",
        "Identification",
        "Transcripts",
        "Reference Letters",
        "Recommendation Letters",
        "Diplomas",
        "Others",
    ];

    const CategoryButton = ({ category }) => {
        const isActive = category === searchTerm;

        return (
            <button
                type="button"
                className={`border border-white hover:border-gray-200 ${isActive ? "hover:text-white border-blue-600 text-blue-700 focus:ring-blue-300 hover:bg-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" : "text-gray-900 focus:ring-gray-300 dark:bg-gray-900 dark:focus:ring-gray-800"} bg-white focus:ring-4 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
                onClick={() => setSearchTerm(category)}
            >
                {category}
            </button>
        );
    };

    const handleDocumentClick = (event, index) => {
        event.stopPropagation();

        if(isAnyCardFlipped) {
            const resetCollection = filteredCollection.map(document => ({
                ...document,
                isFlipped: false,
            }));
            setFilteredCollection(resetCollection);
            setIsAnyCardFlipped(false);
        } else {
            const updatedCollection = filteredCollection.map((document, i) => {
                if (i === index) {
                    return {
                        ...document,
                        isFlipped: !document.isFlipped,
                    };
                } else {
                    return {
                        ...document,
                        isFlipped: false,
                    };
                }
            });

            setFilteredCollection(updatedCollection);
            setIsAnyCardFlipped(true);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                <button
                    type="button"
                    className={`border border-white hover:border-gray-200 ${searchTerm === "" ? "hover:text-white border-blue-600 text-blue-700 focus:ring-blue-300 hover:bg-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" : "text-gray-900 focus:ring-gray-300 dark:bg-gray-900 dark:focus:ring-gray-800"} bg-white focus:ring-4 focus:outline-none rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
                    onClick={() => setSearchTerm("")}
                >
                    All categories
                </button>
                {categories.map(category => (
                    <CategoryButton category={category} key={category} />
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4">
            {filteredCollection.map((document, index) => (
                    <div
                        onClick={() => handleDocumentClick(event, index)}
                        key={index}
                        className="relative h-64"
                    >
                        <AnimatePresence>
                            {!document.isFlipped && (
                                <motion.div
                                    key={document.name + 'front'}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className={`absolute inset-0 flex items-center justify-center ${isAnyCardFlipped ? "brightness-transition" : ""}`}
                                >
                                    <img
                                        className="object-cover w-full h-full rounded-lg filter-brightness"
                                        src={document.image}
                                        alt=""
                                    />
                                </motion.div>
                            )}
                            {document.isFlipped && (
                                <motion.div
                                    key={document.name + 'back'}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg min-w-full min-h-full">
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
                                            <div className="font-bold text-2xl mb-2 text-gray-900 hover:underline">
                                                {document.name}
                                            </div>
                                        </Link>
                                        <p className="text-gray-600 text-lg mb-2">Format: {document.format}</p>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${document.status === "minted" ? "bg-blue-700 text-white" : document.status === "verified" ? "bg-green-500 text-white" : "bg-yellow-300 text-gray-800"} mr-2`}>
                                            {document.status}
                                        </div>
                                        <a href={"#"} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:underline">
                                            Share
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableGrid;


