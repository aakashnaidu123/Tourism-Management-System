// src/pages/RegisterPage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// List of countries with corresponding states
const countriesWithStates = {
    'Australia': [
      'Australian Capital Territory', 'New South Wales', 'Northern Territory',
      'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
    ],
    'Brazil': [
      'Acre', 'Alagoas', 'Amapá', 'Bahia', 'Ceará', 'Distrito Federal',
      'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
      'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
      'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
      'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ],
    'Canada': [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
      'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island',
      'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'
    ],
    'India': [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
      'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
      'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
      'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
      'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
      'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ],
    'Italy': [
      'Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata',
      'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli Venezia Giulia',
      'Lazio', 'Liguria', 'Lombardy', 'Marche',
      'Molise', 'Piedmont', 'Sardinia', 'Sicily',
      'Tuscany', 'Trentino-South Tyrol', 'Umbria', 'Veneto'
    ],
    'Mexico': [
      'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
      'Chiapas', 'Chihuahua', 'Coahuila', 'Colima',
      'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo',
      'Jalisco', 'Mexico State', 'Michoacán', 'Morelos',
      'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
      'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
      'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
      'Veracruz', 'Yucatán', 'Zacatecas'
    ],
    'United Kingdom': [
      'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    'South Africa': [
      'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
      'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape',
      'Western Cape'
    ],
    'Russia': [
      'Adygea', 'Altai Republic', 'Bashkortostan', 'Buryatia',
      'Chechnya', 'Chuvashia', 'Dagestan', 'Ingushetia',
      'Kabardino-Balkaria', 'Kalmykia', 'Karachay-Cherkessia', 'Karelia',
      'Khakassia', 'Komi', 'Mari El', 'Mordovia',
      'North Ossetia-Alania', 'Sakha', 'Tatarstan', 'Tuva',
      'Udmurtia', 'Volgograd', 'Vologda', 'Yamalo-Nenets'
    ],
    'Japan': [
      'Aichi', 'Akita', 'Aomori', 'Chiba',
      'Ehime', 'Fukui', 'Fukuoka', 'Fukushima',
      'Gifu', 'Gunma', 'Hiroshima', 'Hokkaido',
      'Hyōgo', 'Ibaraki', 'Ishikawa', 'Iwate',
      'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi',
      'Kumamoto', 'Kyoto', 'Mie', 'Miyagi',
      'Miyazaki', 'Nagano', 'Nagasaki', 'Niigata',
      'Osaka', 'Oita', 'Okayama', 'Okinawa',
      'Osaka', 'Saga', 'Shiga', 'Shimane',
      'Shizuoka', 'Tochigi', 'Tokushima', 'Tokyo',
      'Tottori', 'Toyama', 'Wakayama', 'Yamagata',
      'Yamaguchi', 'Yamanashi'
    ],
    'France': [
      'Île-de-France', 'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 
      'Brittany', 'Centre-Val de Loire', 'Grand Est', 
      'Hauts-de-France', 'Normandy', 'Nouvelle-Aquitaine', 
      'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'
    ],
    'Germany': [
      'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 
      'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 
      'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 
      'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    'Nigeria': [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 
      'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
      'Cross River', 'Delta', 'Ebonyi', 'Edo', 
      'Ekiti', 'Enugu', 'Gombe', 'Imo', 
      'Jigawa', 'Kaduna', 'Kano', 'Kogi', 
      'Kwara', 'Lagos', 'Nasarawa', 'Niger', 
      'Ogun', 'Ondo', 'Osun', 'Oyo', 
      'Plateau', 'Rivers', 'Sokoto', 'Taraba', 
      'Yobe', 'Zamfara'
    ],
    'Philippines': [
      'Abra', 'Agusan del Norte', 'Agusan del Sur', 'Aklan', 
      'Albay', 'Antique', 'Apayao', 'Aurora', 
      'Basilan', 'Bataan', 'Batanes', 'Batangas', 
      'Benguet', 'Bohol', 'Bukidnon', 'Bulacan', 
      'Cagayan', 'Camarines Norte', 'Camarines Sur', 'Capiz', 
      'Catanduanes', 'Cavite', 'Cebu', 'Compostela Valley', 
      'Cotabato', 'Davao de Oro', 'Davao del Norte', 'Davao del Sur', 
      'Davao Occidental', 'Dinagat Islands', 'Eastern Samar', 'Guimaras', 
      'Ifugao', 'Ilocos Norte', 'Ilocos Sur', 'Iloilo', 
      'Isabela', 'Kalinga', 'La Union', 'Laguna', 
      'Leyte', 'Maguindanao', 'Marinduque', 'Masbate', 
      'Misamis Occidental', 'Misamis Oriental', 'Mountain Province', 'Negros Occidental', 
      'Negros Oriental', 'Northern Samar', 'Nueva Ecija', 'Nueva Vizcaya', 
      'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Pampanga', 
      'Pangasinan', 'Quezon', 'Quirino', 'Rizal', 
      'Romblon', 'Samar', 'Sarangani', 'Siquijor', 
      'Sorsogon', 'South Cotabato', 'Southern Leyte', 'Sultan Kudarat', 
      'Sulu', 'Tarlac', 'Tawi-Tawi', 'Zambales', 
      'Zamboanga del Norte', 'Zamboanga del Sur', 'Zamboanga Sibugay'
    ],
    'Spain': [
      'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 
      'Basque Country', 'Canary Islands', 'Cantabria', 'Castile and León', 
      'Castile-La Mancha', 'Catalonia', 'Extremadura', 'Galicia', 
      'La Rioja', 'Madrid', 'Murcia', 'Navarre', 
      'Valencia'
    ],
    'United States': [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 
      'California', 'Colorado', 'Connecticut', 'Delaware', 
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 
      'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
      'Missouri', 'Montana', 'Nebraska', 'Nevada', 
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 
      'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 
      'Vermont', 'Virginia', 'Washington', 'West Virginia', 
      'Wisconsin', 'Wyoming'
    ]
  };
  

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic
    console.log('Registering with:', fullName, phoneNumber, gender, country, state, city, email, password);
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
        <Select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState(''); // Reset state when country changes
          }}
          required
        >
          <option value="" disabled>Select Country</option>
          {Object.keys(countriesWithStates).map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </Select>
        <Select
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="" disabled>Select State</option>
          {country && countriesWithStates[country].map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
    </RegisterContainer>
  );
};

export default RegisterPage;
