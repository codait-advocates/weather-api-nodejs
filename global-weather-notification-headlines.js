/**
 * from: https://callforcode.weather.com/documentation/
 * Global Weather Notification Headlines (v3) - The Weather Alert Headlines API provides weather watches, 
 * warnings, statements and advisories issued by the NWS (National Weather Service), Environment Canada 
 * and MeteoAlarm. These weather alerts can provide crucial life-saving information. Weather alerts can 
 * be complicated and do not always follow consistent standards, format and rules. 
 * The Weather Company (TWC) strives to ensure that the information is consistent from all of the 
 * different sources but the content is subject to change whenever there is an update from the 
 * authoritative source.
 * 
 * The Weather Alert Headline API returns active weather alert headlines related to Severe Thunderstorms, 
 * Tornadoes, Earthquakes, Floods, etc . This API also returns non-weather alerts such as 
 * Child Abduction Emergency and Law Enforcement Warnings. The Alert Headlines API also provides a 
 * key value found in the <detailKey> attribute to access the alerts detail in the Alerts Detail API.
 * 
 * Within the metadata section of the response there is a field named ‘next‘ if next equals null 
 * the user has received all the data and is done. If next is not null the user will make an additional 
 * call - the ‘next’ parameter will be set equal to the value found in next. 
 * Keep calling the API until next equals null.
 */

exports.API = "/v3/alerts/headlines"

exports.handleResponse = (res) => {
  let details = []
  // loop through alerts
  res.alerts.forEach(alert => {
    // check some fields to decide if this alert is important to you. Some ideas:
    // alert.certainty: one of [ Observed, Likely, Possible, Unlikely, Unknown ]
    // alert.certaintyCode: one of [ 1, 2, 3, 4, 5 ]
    // alert.severity: one of [ Extreme, Severe, Moderate, Minor, Unknown ]
    // alert.severityCode: one of [ 1, 2, 3, 4, 5 ]
    // alert.urgency: one of [ Immediate, Expected, Future, Past, Unknown ]
    // alert.urgencyCode: one of [ 1, 2, 3, 4, 5 ]
    // alert.flood: an object which only has info if the event is a flood
    // alert.headlineText: human readable main message
    if (alert.certainty < 3 && alert.urgency < 3 && alert.severity < 3) {
      details.push(alert.detailKey)
    }
  });
  // return the detailKeys for alerts you deemed important
  return details
}
