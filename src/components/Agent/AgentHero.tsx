@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
 import { useInView } from 'react-intersection-observer';
-import { ArrowRight, Bot, PlayCircle } from 'lucide-react';
+import { Bot, PlayCircle, Loader2 } from 'lucide-react';
+import { useNavigate } from 'react-router-dom';
+import { supabase } from '../../lib/supabase';

 interface AgentHeroProps {
   agentName: string;
@@ .. @@
   categories: string[];
   tags: string[];
   developer: string;
+  agentId: string;
 }

 const AgentHero: React.FC<AgentHeroProps> = ({ 
   agentName,
   agentTitle,
   description, 
   avatar,
   categories,
   tags,
   developer,
+  agentId
 }) => {
+  const navigate = useNavigate();
+  const [isEmploying, setIsEmploying] = React.useState(false);
+  const [user, setUser] = React.useState<any>(null);
   const [ref, inView] = useInView({
     triggerOnce: true,
     threshold: 0.1
   });

+  React.useEffect(() => {
+    supabase.auth.getSession().then(({ data: { session } }) => {
+      setUser(session?.user ?? null);
+    });
+  }, []);
+
+  const handleEmployAgent = async () => {
+    if (!user) {
+      setShowAuthModal(true);
+      return;
+    }
+
+    setIsEmploying(true);
+    try {
+      // Check if agent is already employed
+      const { data: existingAgent, error: checkError } = await supabase
+        .from('user_agents')
+        .select()
+        .match({ user_id: user.id, agent_id: agentId });
+
+      if (checkError) throw checkError;
+
+      if (!existingAgent || existingAgent.length === 0) {
+        // Add agent to user's dashboard
+        const { error: insertError } = await supabase
+          .from('user_agents')
+          .insert([{
+            user_id: user.id,
+            agent_id: agentId,
+            settings: {},
+            is_active: true,
+            last_used: new Date().toISOString()
+          }]);
+        
+        if (insertError) throw insertError;
+      }
+      
+      // Navigate to the agent's dashboard page
+      navigate(`/dashboard/agents/${agentId}`);
+    } catch (error) {
+      console.error('Error employing agent:', error);
+      alert('Failed to add agent to your team. Please try again.');
+    } finally {
+      setIsEmploying(false);
+    }
+  };

   const categoryStyles = {
@@ .. @@
             <div className="flex flex-wrap gap-6">
               <motion.button
-                className="bg-caribbean-current/10 text-caribbean-current px-6 py-3 rounded-lg 
-                         flex items-center gap-2 hover:bg-caribbean-current/20 transition-colors"
+                className="btn-primary flex items-center gap-2"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
+                onClick={handleEmployAgent}
+                disabled={isEmploying}
               >
-                Get Started
-                <ArrowRight className="w-5 h-5" />
+                {isEmploying ? (
+                  <>
+                    <Loader2 className="w-5 h-5 animate-spin" />
+                    Adding {agentName}...
+                  </>
+                ) : (
+                  <>Add {agentName} to your team</>
+                )}
               </motion.button>