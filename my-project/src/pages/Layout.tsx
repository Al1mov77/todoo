import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <section className='flex justify-between items-center p-20'>
        <Link to={"/zustand"}>
          <p className="text-3xl font-semibold text-gray-500">Zustand Page</p>
        </Link>
        <Link to={"/redux"}>
          <p className="text-3xl font-semibold text-gray-500">Redux Toolkit</p>
        </Link>
        <Link to={"/jotai"}>
          <p className="text-3xl font-semibold text-gray-500">Jotai</p>
        </Link>
      </section>
      <Outlet />
    </>
  );
}
export default Layout;