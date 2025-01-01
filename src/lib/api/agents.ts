@@ .. @@
       categories,
       tags,
       developer,
       avatar,
-      services
+      services,
      process,
      metadata
     `)
     .eq('slug', slug)
     .maybeSingle();