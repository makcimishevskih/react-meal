// 11111 
// SingleCategory
// return (
//     <div key={id} className="col s6 m6 l6" >
//         <div className="card" >
//             <div className="card-image">
//                 <MyLazyImage
//                     image={image}
//                     alt={category} />
//                 <span className="card-title card-title_white">{name}</span>
//             </div>
//             <div className="card-content">
//                 <p>{name}</p>
//             </div>
//             <Link to={`/category/${paramsName}/${id}`} className="router-link">Instruction</Link>
//             <Link className="router-link" to='/'>Back to categories</Link>
//         </div>
//     </div >
// );


// 22222 
// SearchCategory
{/* <div className="card">
    <div className="card-image">
        <MyLazyImage
            height={700}
            image={image}
            alt={category} />
        <span className="card-title card-title_black">{area}</span>
    </div>
    <div className="card-content">
        <div className='star-wrapper'>
            {
                classes ?
                    <div onClick={() => handleClickRemove(id)}>
                        <i className={!classes ? 'fa-regular fa-star star ' : "fa-solid fa-star star added"}></i>
                        <span>Delete</span>
                    </div >
                    :
                    <div onClick={() => handleClickAdd(id)}>
                        <i className={!classes ? 'fa-regular fa-star star' : "fa-solid fa-star star added"}></i>
                        <span>Add</span>
                    </div>
            }
        </div>
        <p>Name: {name}. Category: {category}</p>
        <p>{instruction}</p>
    </div>
    <a className="router-link" target='_blank' href={link}>
        Click to get the recipe
    </a>
    <Link className="router-link" onClick={() => goBack(-1)}>Back to home</Link>
</div> */}


// 333
// {
//     isVisible &&
//     <motion.div className="col s12 m12 l12"
//         initial={{ opacity: 0,x: 300 }}
//         animate={{ opacity: 1,x: 0 }}
//         exit={{ opacity: 0,x: -800 }}
//     >
//         <div
//             className="card">
//             <Link to={`/category/${category}/${id}`}>
//                 <motion.div
//                     whileHover={{ opacity: 0.8 }}
//                     className="card-image">
//                     <MyLazyImage
//                         image={image}
//                         alt={category}
//                     />
//                     <span className="card-title card-title_black">{category}</span>
//                 </motion.div>
//             </Link>
//             <div onClick={() => handleClickRemove(id,true)} className="star-wrapper">
//                 <i className={"fa-solid fa-star star added"}></i>
//                 <span>Delete</span>
//             </div>
//             <div className="card-content">
//                 {name}
//             </div>
//             <Link className="router-link" to={`/category/${category}`}>Watch category</Link>
//         </div>
//     </motion.div >
// }




// RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// const CardTop = () => {

// }

// <div className="card" >
//     <div className="card-image">
//         <MyLazyImage
//             image={image}
//             alt={category} />
//         <span className="card-title card-title_white">{name}</span>
//     </div>

//     <div className="card-content">
//         <p>Name: {name}. Category: {category}</p>
//     </div>
// </div>

// <p>{instruction}</p>