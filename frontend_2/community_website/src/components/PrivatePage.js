import React, {
    Component
} from 'react'

import AllPosts from '../components/ShowAllPosts'
import ForumNavbar from '../components/ForumNavbar'

class PrivatePage extends Component {
    render() {
        return(
            <div>
                <div className="bold_head">
                    <h2 className="text-center">dein</h2>
                     <h1 className="text-center font-weight-bold display-4">Forum</h1>
              <ForumNavbar />
                <AllPosts />
                 </div>
           
            </div>
        )
    }
}

export default PrivatePage