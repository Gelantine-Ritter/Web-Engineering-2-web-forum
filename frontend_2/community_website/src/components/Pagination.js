import React, { Component } from 'react'

export class Pagination extends Component {
   render(){
       const { postsPerPage, totalPosts, paginate } = this.props;

       const pageNumber = [];

       for (let i = 1; i< Math.ceil(totalPosts/postsPerPage);i++){
           pageNumber.push(i)
       }
       return(
        <div>
            <nav>
                <ul className= "pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="!#">Prev</a>
                    </li>
                    {pageNumber.map (num => (
                        <li className="page-item" key={num}>
                        <a onClick={()=>paginate(num)} href="!#" className="page-link">{num}</a>
                    </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="!#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
       )
         
       
   }
}

export default Pagination
