@@ .. @@
 import { useNavigate } from 'react-router-dom';
 import DashboardLayout from '../../layouts/DashboardLayout';
 import { supabase } from '../../../lib/supabase';
 
 interface Agent {
   id: string;
@@ .. @@
 const AgentsPage: React.FC = () => {
   const navigate = useNavigate();
   const [agents, setAgents] = React.useState<Agent[]>([]);
   const [loading, setLoading] = React.useState(true);
+  const [connectionStatus, setConnectionStatus] = React.useState<boolean | null>(null);
   const [searchTerm, setSearchTerm] = React.useState('');
   const [selectedCategory, setSelectedCategory] = React.useState('all');
 
   React.useEffect(() => {
+    // Test connection
+    testSupabaseConnection().then(setConnectionStatus);
+    
     fetchAgents();
   }, []);
@@ .. @@
       <div className="p-8">
         <div className="flex justify-between items-center mb-8">
           <div>
+            {connectionStatus !== null && (
+              <p className={`text-sm ${connectionStatus ? 'text-celadon' : 'text-red-500'} mb-2`}>
+                {connectionStatus ? 'Connected to Supabase' : 'Connection failed'}
+              </p>
+            )}
             <h1 className="text-3xl font-heading font-bold text-seasalt mb-2">
               Your Agents
             </h1>