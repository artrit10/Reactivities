import { Button, Form, Segment } from "semantic-ui-react"
import { ChangeEvent, useState } from "react"
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


const ActivityForm = () => {

    const { activityStore } = useStore()

    const initialState = activityStore.selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)

    const handleSubmit = () => {
        activity.id ? activityStore.updateActivity(activity) : activityStore.createActivity(activity)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
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
                <Button onClick={activityStore.closeForm} floated="right" type="button" content='Cancel'></Button>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
