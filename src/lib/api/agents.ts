@@ .. @@
       categories,
       tags,
       developer,
       avatar,
-      services
+      services,
      process,
      process,
      metadata
     `)
     .eq('slug', slug)
     .maybeSingle();