self.addEventListener('install', e => {
    console.log('installed');
})
self.addEventListener('activate', function(e) {
    console.log('activate');
})
self.addEventListener('fetch', function(e) {
    console.log('fetch');
})
