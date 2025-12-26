import { Box, Text, Flex } from 'theme-ui'
import { useState, useMemo, useRef, useEffect } from 'react'
import { MapPin, ArrowUpRight } from 'lucide-react'
import {
  Button,
  Select,
  Heading1,
  Heading2,
  Heading3,
  DatePicker,
  Modal,
  Spinner,
  Meta,
  FadeIn,
} from '../components'
import { getTime, getLongDate, getDate, sortEvents } from '../lib/utils'
import events from '../data/events.json'
import maplibregl from 'maplibre-gl'

const Events = () => {
  const d = new Date()

  const [options, setOptions] = useState({
    date: '',
    borough: 'Anywhere',
  })

  const map = useRef()
  const [selectedEvent, setSelectedEvent] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [embedLoading, setEmbedLoading] = useState(false)

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: 'map',
      style: process.env.NEXT_PUBLIC_MAP_STYLE_URL,
      center: [-73.956, 40.7228],
      zoom: 10.4,
      minZoom: 10,
      attributionControl: false,
    })

    map.current.on('load', async () => {
      map.current.addSource('events', {
        type: 'geojson',
        data: eventsGeoJSON,
      })

      const image = await map.current.loadImage('/red-pin.png')
      map.current.addImage('red-pin', image.data)

      map.current.addLayer({
        id: 'event-pins',
        type: 'symbol',
        source: 'events',
        layout: {
          'icon-image': 'red-pin', // built-in sprite icon
          'icon-size': 0.25,
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
      })

      map.current.on('click', 'event-pins', (e) => {
        const feature = e.features?.[0]
        if (!feature) return

        const props = feature.properties
        const coords = feature.geometry.coordinates

        setModalOpen(true)
        setEmbedLoading(true)
        setSelectedEvent(props.id)
      })

      map.current.on('mouseenter', 'event-pins', () => {
        map.current.getCanvas().style.cursor = 'pointer'
      })

      map.current.on('mouseleave', 'event-pins', () => {
        map.current.getCanvas().style.cursor = ''
      })

      setMapLoaded(true)
    })

    if (map.current) {
      return () => map.current.remove()
    }
  }, [])

  const filteredEvents = useMemo(() => {
    return sortEvents(
      events.filter((d) => {
        return (
          (options.borough == 'Anywhere' || options.borough == d.borough) &&
          (options.date == '' || options.date == getDate(d.start_time))
        )
      }),
    )
  }, [events, options])

  const eventsGeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: filteredEvents.map((e) => ({
        type: 'Feature',
        properties: {
          id: e.id,
        },
        geometry: {
          type: 'Point',
          coordinates: [e.lon, e.lat],
        },
      })),
    }),
    [filteredEvents],
  )

  useEffect(() => {
    if (!mapLoaded) return
    if (!map.current) return

    const source = map.current.getSource('events')
    if (!source) return

    source.setData(eventsGeoJSON)
  }, [eventsGeoJSON, mapLoaded])

  const uniqueDates = useMemo(
    () =>
      new Set(
        events
          .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
          .map((d) => getDate(d.start_time)),
      ),
    [events],
  )

  return (
    <>
      <Meta title='Event Map' description='Join an event' />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedEvent != null && (
          <>
            <Heading2 sx={{ ml: ['12px'], pb: [3], zIndex: 5000 }}>
              {events.filter((d) => d.id == selectedEvent)[0].title}
            </Heading2>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '85dvh',
                overflow: 'hidden',
                pb: [4],
              }}
            >
              {embedLoading && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    mt: [5],
                    justifyContent: 'center',
                  }}
                >
                  <Spinner />
                </Box>
              )}
              <Box
                as='iframe'
                allow='clipboard-write; clipboard-read'
                onLoad={() => setEmbedLoading(false)}
                sx={{
                  mt: '-110px',
                  overflow: 'auto',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                src={
                  events.filter((d) => d.id == selectedEvent)[0].url + '/embed'
                }
              />
            </Box>
          </>
        )}
      </Modal>
      <FadeIn>
        <Box
          sx={{
            display: 'flex',
            height: '100dvh',
            width: '100vw',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: ['100%', '430px'],
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid',
              borderColor: 'gray',
              bg: 'background',
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                bg: 'background',
                borderBottom: '1px solid',
                borderColor: 'gray',
                p: 3,
              }}
            >
              <Heading1
                sx={{
                  fontSize: [8, 8, 9, 10],
                  letterSpacing: '0.01em',
                  mt: ['1px'],
                  color: 'text',
                }}
              >
                Event map
              </Heading1>
              <Flex
                sx={{
                  width: '100%',
                  mt: [3],
                  mb: [1],
                  gap: '12px',
                }}
              >
                <DatePicker
                  value={options.date}
                  setValue={(date) =>
                    setOptions((prev) => ({ ...prev, ['date']: date }))
                  }
                  disabled={(date) => !uniqueDates.has(getDate(date))}
                  defaultMonth={[...uniqueDates][0]}
                />
                <Select
                  onChange={(value) =>
                    setOptions((prev) => ({ ...prev, ['borough']: value }))
                  }
                  icon={true}
                  options={[
                    { value: 'Manhattan', label: 'Manhattan' },
                    { value: 'Brooklyn', label: 'Brooklyn' },
                    { value: 'Queens', label: 'Queens' },
                    { value: 'The Bronx', label: 'The Bronx' },
                    { value: 'Staten Island', label: 'Staten Island' },
                    { value: 'Anywhere', label: 'Anywhere' },
                  ]}
                >
                  <Box
                    sx={{ position: 'absolute', right: '14px', top: '10px' }}
                  >
                    <MapPin size={18} strokeWidth={2.5} />
                  </Box>
                </Select>
              </Flex>
            </Box>
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                px: [3],
              }}
            >
              <Box sx={{ mx: [-3], px: [3], py: [3] }}>
                {filteredEvents.map((d, i) => {
                  return (
                    <Box
                      key={i}
                      onClick={() => {
                        setModalOpen(true)
                        setEmbedLoading(true)
                        setSelectedEvent(d.id)
                      }}
                      sx={{
                        transition: 'background-color 0.1s ease-out',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'muted',
                        },
                        mx: [-3],
                        px: [3],
                        pb: i == filteredEvents.length - 1 ? [4] : [4],
                        pt: i == 0 ? [4] : [4],
                        mt: i == 0 ? [-3] : [0],
                        mb: i == filteredEvents.length - 1 ? [-3] : [0],
                        borderBottom: 'solid 1px',
                        borderColor: 'gray',
                      }}
                    >
                      <Heading2>{d.title}</Heading2>
                      <Heading3 sx={{ mt: [1, 2, 2, 2], opacity: 0.75 }}>
                        {getLongDate(d.start_time)}
                      </Heading3>
                      <Heading3 sx={{ opacity: 0.75 }}>
                        {getTime(d.start_time)}-{getTime(d.end_time)}
                      </Heading3>
                    </Box>
                  )
                })}
                {filteredEvents.length == 0 && (
                  <Box>
                    <Heading3>
                      No events currently scheduled with these filters
                    </Heading3>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'sticky',
                bottom: 0,
                zIndex: 10,
                p: 3,
                borderTop: '1px solid',
                borderColor: 'gray',
              }}
            >
              <Heading3
                as='a'
                href=''
                sx={{
                  textDecoration: 'none',
                  top: '-4px',
                  position: 'relative',
                  color: 'text',
                }}
              >
                External link
                <Box
                  as='span'
                  sx={{ position: 'relative', left: '4px', top: '5px' }}
                >
                  <ArrowUpRight strokeWidth={2} />
                </Box>
              </Heading3>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'relative',
              flex: 1,
            }}
          >
            <Box
              id='map'
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            ></Box>
          </Box>
        </Box>
      </FadeIn>
    </>
  )
}

export default Events
