import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[]
    selectedActivity: Activity | undefined
    selectActivity: (id: string) => void
    cancelActivity: () => void
    editMode: boolean
    openForm: (id: string) => void
    closeForm: () => void
    createEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelActivity, editMode, openForm, closeForm, createEdit, deleteActivity }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelActivity={cancelActivity}
                        openForm={openForm}></ActivityDetails>
                }
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createEdit={createEdit}></ActivityForm>
                }
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;