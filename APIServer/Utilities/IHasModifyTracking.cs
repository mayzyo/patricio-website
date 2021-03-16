using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Utilities
{
    interface IHasModifyTracking
    {
        DateTime Created { get; set; }
        DateTime LastModified { get; set; }
    }
}
