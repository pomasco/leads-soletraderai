@@ .. @@
   name: string;
   description: string;
-  category: string;
+  categories: string[];
   icon: string;
   credit_cost: number;
 }
@@ .. @@
   const filteredAgents = agents.filter(agent => {
     const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
-    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
+    const matchesCategory = selectedCategory === 'all' || 
+                          (agent.categories && agent.categories.includes(selectedCategory));
     return matchesSearch && matchesCategory;
   });
 
-  const categories = ['all', ...new Set(agents.map(agent => agent.category))];
+  const categories = ['all', ...new Set(agents.flatMap(agent => agent.categories || []))];