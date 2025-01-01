@@ .. @@
 export default defineConfig({
   plugins: [react()],
   resolve: {
+    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
     alias: {
       '@': path.resolve(__dirname, './src')
     }
   },
   optimizeDeps: {
-    exclude: ['lucide-react'],
+    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
+    exclude: []
   }
 });