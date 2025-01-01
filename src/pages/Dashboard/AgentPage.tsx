@@ .. @@
 import DashboardLayout from '../layouts/DashboardLayout';
 
 const AgentPage: React.FC = () => {
-  const { agentId } = useParams();
+  const { agentSlug } = useParams();
   const [agent, setAgent] = React.useState<any>(null);
   const [loading, setLoading] = React.useState(true);
 
@@ .. @@
       const { data, error } = await supabase
         .from('agents')
         .select('*')
-        .eq('id', agentId)
+        .eq('slug', agentSlug)
         .single();
       
       if (!error && data) {
@@ -15,7 +15,7 @@
       setLoading(false);
     };
 
     fetchAgent();
-  }, [agentId]);
+  }, [agentSlug]);