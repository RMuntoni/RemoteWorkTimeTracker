using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace TimeTracker.Internal
{
    //Todo: For now we use json. We should change this for an actual database. Timeconstraints have forced me to implement it like this for demonstrations.
    public class JsonDatabase<T> : IDataBaseConnection<T>
    {
        public string PathToFile {get;set;}

        public IEnumerable<T> GetAll()
        {
            if (!File.Exists(PathToFile))
                return Enumerable.Empty<T>();

            try
            {
                var jsonData = File.ReadAllText(PathToFile);
                var deserialized = JsonSerializer.Deserialize<T[]>(jsonData, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, IgnoreReadOnlyProperties = true });
                return deserialized.ToList() ;
            }
            catch (Exception ex)
            {
                //Todo: We need proper exception handling. Logging and error Message return (or similar)
                return Enumerable.Empty<T>();
            }
        }

        public bool Save(T data)
        {
            if (!File.Exists(PathToFile))
                return false;

            var all = GetAll().ToList();
            all.Add(data);

            var serialized = JsonSerializer.Serialize<IList<T>>(all, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, IgnoreReadOnlyProperties = true }); ;

            try
            {
                File.WriteAllText(PathToFile, serialized);
                return true;
            }
            catch (Exception ex)
            {
                //Todo: We need proper exception handling. Logging and error Message return (or similar)
                return false;
            }
        }
    }
}
