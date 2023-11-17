import React,{useState, useEffect} from 'react';
import { supabase } from '../client';
import '../styles/CrudServicios.css';

const CrudServicios = () => {
  const [init,setInit]=useState([])
  const [data,setData]=useState({
    Name:'',
    Date:'',
    Price:'',
    Plate:'',
    Address:''
  })

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = init.slice(indexOfFirstItem, indexOfLastItem);

  //Solo se pueda elegir una fecha desde hoy
  const date = new Date();
  const today = date.toISOString().split('T')[0];

  useEffect(() => {
    fetchData()
  }, [])
  
  async function fetchData() {
    const { data, error } = await supabase
      .from('Carvuk DB')
      .select('*')
    
    setData(data);
    setInit(data);
    console.log(data)
  }

  function handleChange(event){
    setData(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  //Crea un valor en la base de datos si los datos vienen llenos
  async function createTask(e){
    e.preventDefault()
    if (!data.Name || !data.Date || !data.Price || !data.Plate || !data.Address) {
      alert('Debes llenar todos los campos');
      return;
    }
    await supabase
      .from('Carvuk DB')
      .insert({ Name: data.Name, Date: data.Date, Price: data.Price, Plate: data.Plate, Address: data.Address })
      alert('Servicio Creado exitosamente');

    // Eliminar la data de los inputs al ser creado
    setData({
      Name: '', Date: '', Price: '', Plate: '', Address: ''
    });

    fetchData()    
  }

  //Borra un valor de la base de datos
  async function deleteUser(userId){
    await supabase
      .from('Carvuk DB')
      .delete()
      .eq('id', userId)
    fetchData()
  }
  return (
    <div className='container'>


      {/* Form para crear un nuevo servicio */}
      <form onSubmit={createTask}>
      <br/>
        <select className='select-option' value={data.Name} name='Name' onChange={handleChange}>

          <option value="">Selecciona un servicio</option>
          <option value="Lavado de auto">Lavado de auto</option>
          <option value="Revisión técnica">Revisión técnica</option>
          <option value="Mantención por kilometraje">Mantención por kilometraje</option>
        </select>
        <br/>
        <input className='select-option'
          type="date"
          value={data.Date}
          placeholder=" Fecha"
          name='Date'
          min = {today}
          onChange={handleChange}
        />
        <br/>
        <input className='select-option' type="number" value={data.Price} placeholder=" Precio" name='Price' onChange={handleChange}/>
        <br/>
        <input className='select-option' type="text" value={data.Plate} placeholder=" Patente" name='Plate' onChange={handleChange}/>
        <br/>
        <input className='select-option' value={data.Address} type="text" placeholder=" Dirección" name='Address' onChange={handleChange}/>
        <br/>
        <button className='button' type='submit' >Crear servicio para auto</button>
      </form>


      {/* Tabla con datos */}
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre servicio</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th>Patente</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.Name}</td>
                <td>{data.Date}</td>
                <td>{data.Price}</td>
                <td>{data.Plate}</td>
                <td>
                  <button className='button' onClick={() => deleteUser(data.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='button' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <button className='button' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage) }>Siguiente</button>
      </div>
    </div>
  )
}
export default CrudServicios