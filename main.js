if('serviceWorker' in navigator)
{
    console.log("Puedes usar el Service Worker");

    navigator.serviceWorker.register('./sw.js')
    .then(res=>console.log('SW cargado correctamente', res))
    .catch(err=>console.log('Service Worker no se ha podido registrar', err));

}
else
{
    console.log("No se puede usar el Service Worker");
}