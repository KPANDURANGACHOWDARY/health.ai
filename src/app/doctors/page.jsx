import Doctors from "../../views/Doctors";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function Page() { return <ProtectedRoute><Doctors /></ProtectedRoute>; }
