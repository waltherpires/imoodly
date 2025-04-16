import RecordFilter from "./RecordFilter";
import RecordsResult from "./recordsResults/RecordResults";

export default function Records() {
    return(
        <div className="md:col-span-2">
        {/* adicionar logica filtro */}
            <RecordFilter />
            <RecordsResult /> 
        </div>
    );
}