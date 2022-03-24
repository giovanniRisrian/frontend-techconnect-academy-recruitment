import Register from "../globalComponent/register/Register"
import MyComponent from "../homepage/BackgroundImage"
import Card from "@mui/material/Card";


const Registers = ()=>{
return(<div>
      <MyComponent
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card 
        style={{
          backgroundColor: "#FDFCE5",
        //   height: "50vh",
          padding: "4vh",
          boxShadow: "0 13px 13px -4px lightblue",
        }}
        variant="outlined"
      >
       
    <Register/>
      </Card>
    </MyComponent>
    
    
    </div>)
}
export default Registers