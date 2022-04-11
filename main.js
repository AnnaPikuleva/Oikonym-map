document.addEventListener('DOMContentLoaded', function () {

    var map = new maplibregl.Map({
        container: 'map', // container id
    
        style: {
            version: 8,
            sources: {},
            layers: []
        },
        center: [37.625, 55.751], // starting position [lng, lat]
        zoom: 5, // starting zoom
        maxZoom: 10
    });

   
    map.on('load', function () {
       

        map.addSource('grid',{
            'type':'vector',
            'tiles': ["http://localhost:3000/public.grid/{z}/{x}/{y}.pbf"]
    
        });

        map.addLayer(
            {
                'id': 'grid-layer',
                'type': 'fill',
                'source': 'grid',
                'source-layer': 'public.grid',
                'paint': {
                    //настроим интерполяцию цветов 
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get' , 'n'],
                    0,
                    '#440154',
                    10,
                    '#39568c',
                    40,
                    '#1f968b',
                    80,
                    '#fde725'
                ]          
            }
     
        })

        

        // DOCS: https://docs.mapbox.com/api/maps/vector-tiles/
        // https://api.mapbox.com/v4/{tileset_id}/{zoom}/{x}/{y}.{format} --- {zoom} > {z}, {format} > mvt
        map.addSource('oikonyms', {
            'type': 'vector',
            "tiles": ["http://localhost:3000/public.oikonyms/{z}/{x}/{y}.pbf"],
            //добавим мультимаштабность (ограничение по масштабу)
            'minzoom':6
        });
        map.addLayer(
            {
                'id': 'oikonyms-layer',
                'type': 'circle',
                'source': 'oikonyms',
                'source-layer': 'public.oikonyms',
                'paint': {
                    
                        
                        'circle-color': "red",
                        'circle-opacity': 0.8,

                        'circle-radius': 3
                          
                        
                     }
                    })
                

        var popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
        })



        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'oikonyms-layer', function (e) {
            map.getCanvas().style.cursor = 'pointer'
            console.log(e)
            //создаем всплывающее окно
            popup
            //координаты появление
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name)
                .addTo(map)

            ;
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'oikonyms-layer', function () {
            map.getCanvas().style.cursor = '';
            popup.remove()
        });



        

        
    })
})




