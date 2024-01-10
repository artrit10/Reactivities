import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
    cancelActivity: () => void
    openForm: (id: string) => void
}

const ActivityDetails = ({ activity, cancelActivity, openForm }: Props) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color="blue" content='Edit'></Button>
                    <Button onClick={cancelActivity} basic color="grey" content='Cancel'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default ActivityDetails;