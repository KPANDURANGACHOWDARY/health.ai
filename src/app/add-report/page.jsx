import AddReport from "../../views/AddReport";
import ProtectedRoute from "../../components/ProtectedRoute";
export default function Page() { 
    return 
    <ProtectedRoute>
        <AddReport />
    </ProtectedRoute>; 
}