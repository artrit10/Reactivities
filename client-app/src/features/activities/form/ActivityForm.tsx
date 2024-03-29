import { Button, Form, Segment } from "semantic-ui-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 } from "uuid";


const ActivityForm = () => {

    const { activityStore } = useStore()

    const { id } = useParams()
    const navigate = useNavigate()

    const initialState = {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(activity!))
    }, [id, activityStore.loadActivity])

    const handleSubmit = () => {
        if (!activity.id) {
            activity.id = v4();
            activityStore.createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (activityStore.loadingInitial) return <LoadingComponent />
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}></Form.Input>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}></Form.Input>
                <Button loading={activityStore.loading} floated="right" positive type="submit" content='Submit'></Button>
                <Button as={Link} to={'/activities'} floated="right" type="button" content='Cancel'></Button>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
