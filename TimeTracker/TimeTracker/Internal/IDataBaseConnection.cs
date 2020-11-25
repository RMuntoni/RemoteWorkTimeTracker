using System.Collections.Generic;

namespace TimeTracker.Internal
{
    public interface IDataBaseConnection<T>
    {
        //Should house crud operations for now only get and save are relevant
        IEnumerable<T> GetAll();

        bool Save(T task);
    }
}
