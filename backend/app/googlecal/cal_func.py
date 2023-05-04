# 참고 사이트: https://developers.google.com/calendar/api/v3/reference/events/list?hl=ko#python
from ..googlecal.cal import get_cal

from googleapiclient.errors import HttpError
from datetime import datetime

def get_event():
    
    list_event=[]
    service=get_cal()
    # Call the Calendar API
    try:
        now = datetime.now()
        now = str(now.date()) +'T00:00:00+09:00'
        print(now)
        # print('Getting the upcoming 100 events')
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
            return

        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date')) # 시작날짜와 시간
            end = event['end'].get('dateTime', event['end'].get('date')) # 종료날짜와 시간
            start=start[:19]
            end=end[:19]

            # 기본설정: default/ 전체공개:public/ 비공개:private
            try:
                state=event['visibility']
            except KeyError:
                state='default'

            list_event.append([start,end,event['summary'],state]) 
        return list_event

    except HttpError as error:
        print('An error occurred: %s' % error)
