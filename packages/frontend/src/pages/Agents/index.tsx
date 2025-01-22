import { supabase } from '../../../lib/supabase';

interface Agent {
  id: string;
  name: string;
  description: string;
  categories: string[];
  icon: string;
  is_active: boolean;
  last_used: string;
}

const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchAgents(session.user.id);
      }
    });
  }, []);

const fetchAgents = async (userId: string) => {
  try {
    const { data: userAgents, error } = await supabase
      .from('user_agents')
      .select(`
        last_used,
        is_active,
        agents (
          id,
          name,
          description,
          categories,
          icon
        )
      `)
      .eq('user_id', userId) // Filter by the current user
      .order('last_used', { ascending: false }); // Sort by `user_agents.last_used`

    if (error) throw error;

    if (userAgents && Array.isArray(userAgents)) {
      setAgents(userAgents.map(ua => ({
        ...ua.agents, // Map agent details
        is_active: ua.is_active, // User-specific is_active field
        last_used: ua.last_used, // User-specific last_used field
      })));
    }
  } catch (error) {
    console.error('Error fetching agents:', error);
  } finally {
    setLoading(false);
  }
};

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.categories?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(agents.flatMap(agent => agent.categories || []))];

  return (
    <DashboardLayout>
      <div className="p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {filteredAgents.map(agent => (
              <motion.div key={agent.id} className="bg-gunmetal rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-seasalt mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-seasalt/60 text-sm">
                      {agent.description}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    agent.is_active ? 'bg-celadon/20' : 'bg-dark-cyan/20'
                  }`}>
                    <span className={`text-sm ${
                      agent.is_active ? 'text-celadon' : 'text-dark-cyan'
                    }`}>
                      {agent.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                {agent.last_used && (
                  <p className="text-seasalt/40 text-sm">
                    Last used: {new Date(agent.last_used).toLocaleString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgentsPage;