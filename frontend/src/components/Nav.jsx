// rrd imports
import { Form, NavLink } from "react-router-dom"

// library
import { TrashIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// assets
import logomark from "../assets/logomark.svg"

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={30} />
        <span>BudgetWise</span>
      </NavLink>
      {
        // userName && (
        //   <Form
        //     method="post"
        //     action="logout"
        //     onSubmit={(event) => {
        //       if (!confirm("Do You Want To LogOut")) {
        //         event.preventDefault()
        //       }
        //     }}
        //   >
        //     <button type="submit" className="btn btn--warning">
        //       <span>Logout</span>
        //       <TrashIcon width={20} />
        //     </button>

        //   </Form>
        // )
      }
    </nav>
  )
}
export default Nav