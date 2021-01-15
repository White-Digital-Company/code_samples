import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import { Waypoint } from 'Routes'

export default async (waypoints: Waypoint[], fileId: string) => {
  const path = `${RNFS.DocumentDirectoryPath}/${fileId}.gpx`

  await RNFS.writeFile(
    path,
    `<?xml version="1.0" encoding="utf-8"?>
        <gpx version="1.1">
            ${waypoints.reduce(
              (acc, waypoint, index) => `${acc}
              <wpt lat="${waypoint.geoY}" lon="${waypoint.geoX}">
                <name>${index}</name>
                <sym>Waypoint</sym>
              </wpt>
            `,
              '',
            )}
            <rte>
              <name>Main Route</name>
              ${waypoints.reduce(
                (acc, waypoint, index) => `${acc}
                <rtept lat="${waypoint.geoY}" lon="${waypoint.geoX}">
                  <name>${index}</name>
                  <sym>Waypoint</sym>
                </rtept>
              `,
                '',
              )}
            </rte>
        </gpx>`,
    {
      filetype: 'application/gpx+xml',
    },
  )

  await FileViewer.open(path, { showOpenWithDialog: true })
}
