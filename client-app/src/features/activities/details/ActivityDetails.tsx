import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store";


const ActivityDetails = () => {
    const { activityStore } = useStore()
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} />
            <CardContent>
                <CardHeader>{activityStore.selectedActivity?.title}</CardHeader>
                <CardMeta>
                    <span>{activityStore.selectedActivity?.date}</span>
                </CardMeta>
                <CardDescription>
                    {activityStore.selectedActivity?.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={() => activityStore.openForm(activityStore.selectedActivity?.id)} basic color="blue" content='Edit'></Button>
                    <Button onClick={activityStore.cancelActivity} basic color="grey" content='Cancel'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default ActivityDetails;