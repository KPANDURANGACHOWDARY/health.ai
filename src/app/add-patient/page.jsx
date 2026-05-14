import AddPatient from "../../views/AddPatient";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function Page() { return <ProtectedRoute><AddPatient /></ProtectedRoute>; }
