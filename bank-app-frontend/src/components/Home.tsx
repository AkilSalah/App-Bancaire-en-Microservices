import { Link } from "react-router-dom";

const Home = () =>{
    return (
        <div className="relative bg-gradient-to-r from-orange-900 min-h-[90vh] to-indigo-800 py-16 font-[sans-serif]">
        <div className="absolute inset-0">
          <img src="https://media.istockphoto.com/id/640267784/photo/bank-building.jpg?s=612x612&w=0&k=20&c=UTtm4t6WR-MLwO6ATq5l6n3SoCc6HpaClEFZMxO1Nek=" alt="B" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative max-w-screen-xl mt-16 mx-auto px-8 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">Welcome to Our Premium Service</h1>
          <p className="text-lg md:text-xl mb-12">Experience excellence like never before with our exclusive Music and services.</p>
          <Link to="/customers" type="button" className="bg-[#4b2c45] hover:bg-orange-500 text-white text-base tracking-wide px-6 py-3 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl">Get Started</Link>
        </div>
    </div>
    )
}
export default Home;
