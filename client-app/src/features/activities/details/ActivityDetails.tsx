import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityDetails = () => {
    const { activityStore } = useStore()
    const { selectedActivity, loadActivity, loadingInitial } = activityStore
    const { id } = useParams();

    useEffect(() => {
        id && loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) return <LoadingComponent></LoadingComponent>
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} />
            <CardContent>
                <CardHeader>{selectedActivity?.title}</CardHeader>
                <CardMeta>
                    <span>{selectedActivity?.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity?.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${selectedActivity.id}`} basic color="blue" content='Edit'></Button>
                    <Button as={Link} to={'/activities'} basic color="grey" content='Cancel'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default observer(ActivityDetails);