import Analytics from "../../views/Analytics";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function Page() { return <ProtectedRoute><Analytics /></ProtectedRoute>; }
